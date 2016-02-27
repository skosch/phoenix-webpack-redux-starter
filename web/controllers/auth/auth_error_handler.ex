defmodule App.AuthErrorHandler do
  def unauthenticated(conn, params) do
    IO.inspect params
    conn
      |> Plug.Conn.send_resp(401, "Unauthenticated")
  end

  def unauthorized(conn, params) do
    IO.inspect params
    conn
      |> Plug.Conn.send_resp(401, "Unauthorized")
  end
end
