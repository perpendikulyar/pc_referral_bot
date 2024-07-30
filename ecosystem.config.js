module.exports = {
  apps : [{
    name   : "pc-referral_bot",
    script : "./dist/bot.js",
    instances: 1,
    cron_restart: '0 * * * *',
    watch: ["dist"],
    out_file: "logs/application.log",
    error_file: "logs/error.log",
    log_date_format: "YYYY-MM-DD HH:mm"
  }],
}
