const { MONGO_HOSTNAME } = process.env;
/**
 * In a real world example this config file must be exchanged with a
 * config dependency to manage diff configs across diff environments
 */
export const Config = {
  employeesUrl: 'https://employees-api.vercel.app/api',
  states: ['planned', 'active', 'done', 'failed'],
  pagination_limit: 5,
  pagination_offset: 0,
  role: {
    manager: 'manager',
  },
  connection_token: 'CONNECTION',
  core_db_name: 'ACME_CORP_CORE',
  mongodb: {
    /**
     * using container name 'mongo' as a host for docker dev compatibility
     * this should be avoided in a real application situation and use an
     * environment driven config instead.
     */
    conn: `mongodb://${MONGO_HOSTNAME || 'localhost'}:27017`,
    opt: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
