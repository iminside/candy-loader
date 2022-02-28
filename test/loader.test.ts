import path from 'path'
import webpack, { Compiler, Stats, Configuration } from 'webpack'
import { createFsFromVolume, Volume } from 'memfs'

jest.setTimeout(20000)

const webpackConfig: Configuration = {
    mode: 'development',
    entry: path.resolve(__dirname, './fixture/index.js'),
    devtool: 'inline-source-map',
    output: {
        publicPath: '/',
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: { loader: 'babel-loader', options: { presets: ['@babel/preset-react'] } },
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'candy-loader'],
            },
            {
                test: /\.jpg$/,
                use: ['file-loader'],
            },
        ],
    },
    resolveLoader: {
        alias: {
            'candy-loader': path.resolve(__dirname, '../'),
        },
    },
}

const compile = (compiler: Compiler) => {
    return new Promise((resolve, reject) => {
        compiler.run((error?: null | Error, stats?: Stats) => {
            if (error || (stats && stats.hasErrors())) {
                reject(stats ? stats.compilation.errors : error)
            }
            resolve(stats)
        })
    })
}

it('transform code and match snapshot', async () => {
    const compiler = webpack(webpackConfig)
    const volume = new Volume()
    const memoryFs = createFsFromVolume(volume)

    compiler.outputFileSystem = memoryFs

    await compile(compiler)

    expect(memoryFs.existsSync(path.resolve('dist/bundle.js'))).toEqual(true)

    const code = memoryFs.readFileSync(path.resolve('dist/bundle.js'), 'utf8')

    expect(code).toMatchSnapshot('code')

    expect(volume.toJSON()).toMatchSnapshot('volume')
})
