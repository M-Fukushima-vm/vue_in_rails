class ApplicationController < ActionController::Base
  # Tokenが一致しなかった場合にsessionを空にする(CSRF対策設定)
  protect_from_forgery with: :null_session

  
end
