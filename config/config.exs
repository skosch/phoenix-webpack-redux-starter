# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :app, App.Endpoint,
  url: [host: "localhost"],
  root: Path.dirname(__DIR__),
  secret_key_base: "oXRtNiXOhVb05V/Isl5q5b9m1fwZWbhFpAudpT4VaAO2L0e5F/oNH9ONqwzk53dg",
  render_errors: [accepts: ~w(html json)],
  pubsub: [name: App.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Guardian's JWT system
config :guardian, Guardian,
  issuer: "App",
  ttl: {30, :days},
  verify_issuer: true, # only accept our own tokens
  secret_key: "haufasdfsherqivsdv;ijas;ofiqwe", # should have a new production key
  permissions: %{
    backstage: [:backstage_actions],
    admin: [:admin_actions],
    staff: [:staff_actions],
  },
  serializer: App.GuardianSerializer

config :ueberauth, Ueberauth,
  providers: [
    identity: {Ueberauth.Strategy.Identity, []},
  ]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

# Configure phoenix generators
config :phoenix, :generators,
  migration: true,
  binary_id: false
