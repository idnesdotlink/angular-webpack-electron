const web_env    = (process.env.WEB === 'true') ? true : false;
const dev_env    = (process.env.NODE_ENV !== 'production') ? true : false;
const hmr_env    = (process.env.HMR === 'true') ? true : false;
const sw_env     = (process.env.SW === 'true') ? true : false;
const no_aot_env = (process.env.NO_AOT == 'true') ? true : false;
const clean_env  = (process.env.CLEAN === 'true') ? true : false;
const port_env   = (process.env.PORT);
const host_env   = (process.env.HOST);

export { web_env, dev_env, hmr_env, sw_env, no_aot_env, port_env, host_env, clean_env };