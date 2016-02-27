defmodule App.Router do
  use App.Web, :router

  pipeline :app_layout do
    plug :put_layout, {App.AppView, :app}
  end

  pipeline :facade_layout do
    plug :put_layout, {App.FacadeView, :facade}
  end

  pipeline :backstage_layout do
    plug :put_layout, {App.BackstageView, :backstage}
  end

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :browser_session do
    # Check the Authorization header for a token
    plug :fetch_session
    plug Guardian.Plug.VerifySession
    plug Guardian.Plug.LoadResource
  end

  pipeline :auth do
    plug :fetch_session
    plug :fetch_flash
  end

  pipeline :api do
    plug :accepts, ["json"]
    # Check the Authorization header for a token
    plug Guardian.Plug.VerifyHeader
    plug :fetch_session
    plug Guardian.Plug.VerifySession
    plug Guardian.Plug.LoadResource
  end

  scope "/", App do
    pipe_through [:browser, :facade_layout] # Use the default browser stack

    get "/", FacadeController, :index
  end

  # Regular app
  scope "/app/", App do
    pipe_through [:browser, :browser_session, :app_layout]

    # route anything in /app through the react router
    get "/", AppController, :index
    get "/:route", AppController, :index
  end

  # Backstage app
  scope "/backstage/", App do
    pipe_through [:browser, :browser_session, :backstage_layout]
    get "/", BackstageController, :index
    get "/:route", BackstageController, :index
  end

  # Login/logout endpoints
  scope "/auth", App do
    pipe_through [:auth]
    get "/:provider", SessionController, :request
    get "/:provider/callback", SessionController, :callback
    post "/identity/callback", SessionController, :identity_callback
    get "/revoke", SessionController, :revoke
  end

  # API endpoints
  scope "/api/v1", App do
    pipe_through [:browser, :api]

    #get "/users", UserController, except: [:new, :edit]
  end

end
