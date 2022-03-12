import postcss from 'postcss'
import postcssImport from 'postcss-import'
import postcssUrl from 'postcss-url'
import postcssModules from 'postcss-modules'
import { tags, components } from './tags'
import { loadConfig } from './config'

export interface LoaderContext {
    mode: 'production' | 'development' | 'none'
    context: string
    resourcePath: string
    async(): (err: Error | null, content: string | Buffer, sourceMap?: any, meta?: any) => void
    addDependency(path: string): void
    addBuildDependency(path: string): void
    importModule(path: string): any
    utils: {
        contextify(ctx: string, path: string): string
        absolutify(ctx: string, path: string): string
    }
}

type PostcssUrlAsset = {
    absolutePath: string
    originUrl: string
}

export default async function loader(this: LoaderContext, source: string) {
    const callback = this.async()
    const { plugins, processOptions } = await loadConfig(this)

    const factoryPath = this.utils.contextify(this.context, require.resolve('./factory'))
    const out = [`import { createComponent } from '${factoryPath}'`]

    const { css } = await postcss([
        postcssImport({
            // hack, used only for add dependency
            filter: (path) => {
                const absolutePath = this.utils.absolutify(this.context, path)

                this.addDependency(absolutePath)

                return true
            },
        }),
        postcssUrl({
            url: (async (asset: PostcssUrlAsset) => {
                try {
                    this.addDependency(asset.absolutePath)

                    const module = await this.importModule(asset.absolutePath)

                    return module.default
                } catch (e) {
                    return asset.originUrl
                }
            }) as any,
        }),
        postcssModules({
            getJSON: (_, json) => {
                out.push(`const styles = ${JSON.stringify(json)}`)

                for (let i = 0; i < tags.length; i++) {
                    const tag = tags[i]
                    const component = components[i]

                    out.push(`export const ${component} = createComponent('${tag}', styles)`)
                }
            },
        }),
        ...plugins,
    ]).process(source, processOptions)

    out.push(`export default [[module.id, \`${css}\`]]`)

    const result = out.join('\n')

    // console.log(result)

    callback(null, result)
}
