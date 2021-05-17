Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'home#index'
  namespace :api do
    resources :users, only:[:create]
    resource :session, only:[:create, :destroy]
    resources :microposts, only:[:index, :create, :show, :update, :destroy]
  end
end
