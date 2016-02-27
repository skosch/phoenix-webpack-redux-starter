defmodule App.GuardianSerializer do
  @behaviour Guardian.Serializer
  @moduledoc """
  Converts JWTs (JSON Web Tokens) to useful Elixir tuples, and back.

  Guardian knows about this module thanks to config/config.exs
  """

  def for_token(user) do
    userId = user["id"]
    {:ok, "User:#{userId}"}
  end

  def for_token(_token) do
    {:error, "Unknown resource type"}
  end

  def from_token("User:" <> id) do
    # TODO: get user object from database. E.g. in Rethink:
    # user = table("users")
    #  |> get(id)
    #  |> Rethink.run
    #  |> Map.fetch!(:data)

    # and return the user
    user = %{}
    {:ok, user}
  end
  def from_token(_token) do
    {:error, "Unknown resource type"}
  end
end
