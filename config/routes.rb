Rails.application.routes.draw do
  namespace :api do
    get 'tags/index'
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'home#index'
  namespace :api do
    resources :users, only:[:index, :create, :show]
    resource :session, only:[:create, :destroy]
    resources :microposts, only:[:index, :create, :show, :update, :destroy]
    resources :tags, only: %i[index]
    
    namespace :me do
      resource :account, only:[:update]
    end
  end
end
