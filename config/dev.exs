use Mix.Config

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with brunch.io to recompile .js and .css sources.
config :app, App.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  cache_static_lookup: false,
  check_origin: false,
  watchers: [{
    Path.expand("webpack.devserver.js"), []
  }]

# Watch static and templates for browser reloading.
config :app, App.Endpoint,
  live_reload: [
    patterns: [
      #~r{priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$},
      ~r{web/.*(ex)$},
      ~r{web/views/.*(ex)$},
      ~r{web/controllers/.*(ex)$},
      ~r{web/channels/.*(ex)$},
      ~r{web/controllers/auth/.*(ex)$},
      ~r{web/templates/.*(eex)$},
      ~r{lib/.*(ex)$},
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development.
# Do not configure such in production as keeping
# and calculating stacktraces is usually expensive.
config :phoenix, :stacktrace_depth, 20

# Configure your database
config :app, App.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "app_dev",
  hostname: "localhost",
  pool_size: 10
