Rails.application.routes.draw do
  resources :followings
  resources :followers
  resources :likes
  resources :comments
  resources :posts
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html


  #user routes
  post '/login', to: 'users#login'
  get '/profile', to: 'users#profile'
  patch '/update', to: 'users#update'
  delete '/destroy', to: 'users#destroy'
  get '/not_followed_yet', to: 'users#not_followed_yet'
  get '/follow_list', to: 'users#follow_list'
  get '/discover_bin_users', to: 'users#discover_bin_users'
  delete '/delete_account', to: 'users#delete_account'

  #post routes
  post '/create_post', to: 'posts#create_post'
  get '/user_posts', to: 'posts#user_posts'
  get '/followings_posts', to: 'users#followings_posts'
  post '/add_comment', to: 'comments#add_comment'
  post '/like_picture', to: 'likes#like_picture'
  delete '/unlike_picture', to: 'likes#unlike_picture'

  #following routes
  post '/add_follow', to: 'follows#add_follow'

  
  # Defines the root path route ("/")
  # root "articles#index"
end
