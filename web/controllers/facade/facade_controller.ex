defmodule App.FacadeController do
  use App.Web, :controller

  def index(conn, _params) do
    render conn, "homepage.html"
  end

  def about(conn, _params) do
    render conn, "about.html"
  end
end
