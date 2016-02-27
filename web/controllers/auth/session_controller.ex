defmodule App.SessionController do
  use App.Web, :controller

  alias Comeonin.Bcrypt

  plug :scrub_params, "username" when action in [:create]
  plug Ueberauth

  def identity_callback(conn, params) do
    # try to get the user object from the database

    # TODO: get the user from the database, e.g.
    # user = table("users")
    #  |> get_all(params["username"], %{index: "username"})
    #  |> Rethink.run
    #  |> Map.fetch!(:data)
    #  |> List.first
    user = %{}
    # TODO: get the user's password
    if (user && Bcrypt.checkpw(params["password"], user["password"])) do
      conn
        |> Guardian.Plug.sign_in(user, :token, perms: Map.get(user, "permissions", %{}) )
        # redirect to params.redirect
        |> redirect(to: "/admin")
    else
      conn
        |> Guardian.Plug.sign_out
        |> redirect(to: "/")
    end
  end

  @doc """
  Logs the user out
  """
  def revoke(conn, _params) do
    IO.inspect conn
    Guardian.Plug.sign_out(conn)
      |> redirect(to: "/")
  end
end
