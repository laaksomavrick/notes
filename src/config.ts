import convict from 'convict';

const config = convict({
    env: {
        doc: '',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV'
    },
    host: {
        doc: 'The IP address to bind.',
        format: 'ipaddress',
        default: '127.0.0.1',
        env: 'HOST'
    },
    port: {
        doc: 'The port to bind.',
        format: 'port',
        default: 3000,
        env: 'PORT'
    },
    database: {
        host: {
            default: 'localhost',
            env: 'DB_HOST'
        },
        port: {
            default: 3306,
            env: 'DB_PORT'
        },
        username: {
            default: 'root',
            env: 'DB_USERNAME'
        },
        password: {
            default: 'root',
            env: 'DB_PASSWORD'
        },
        schema: {
            default: 'notes_dev',
            env: 'DB_SCHEMA'
        },
        synchronize: {
            default: true,
            env: 'DB_SYNC'
        }
    },
    secret: {
        jwt: {
            default: 'aaaaaaaaaaaaaaaa',
            env: 'SECRET_JWT'
        },
        bcrypt: {
            default: 'aaaaaaaaaaaaaaaa',
            env: 'SECRET_BCRYPT'
        }
    }
});

if (config.get('env') === 'test') {
    config.load({
        database: {
            schema: 'notes_test'
        },
        port: null
    });
}

export default config;
