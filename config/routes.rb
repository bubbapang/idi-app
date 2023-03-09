Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  
  # post 'api/test', to: 'application#test'




  # have stores and items too
  # make items nested under stores so that i can make requests like
  # this: `/api/stores/${storeId}/items`
  
  namespace :api, defaults: { format: :json } do
    resources :users, only: :create
    resource :session, only: [:show, :create, :destroy]
    resources :stores, only: [:index, :show]
    resources :items, only: [:index, :show]
    resources :store_items, only: [:index, :show]
    resources :cart_items, only: [:index, :create, :update, :destroy]
  end

  get '*path', to: "static_pages#frontend_index"
end