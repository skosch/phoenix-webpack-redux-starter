defmodule App.BackstageController do
  use App.Web, :controller

  plug Guardian.Plug.EnsurePermissions, handler: App.AuthErrorHandler, admin: [:dashboard]
  plug Guardian.Plug.EnsureAuthenticated, handler: App.AuthErrorHandler

  def index(conn, _params) do
    render conn, "index.html"
  end
end
