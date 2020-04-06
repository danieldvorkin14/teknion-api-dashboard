Rails.application.routes.draw do
  resources :api_connections

  get '/get_endpoint_status', to: 'api_connections#get_endpoint_status', as: 'get_endpoint_status'
end
