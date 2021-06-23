class Api::Me::AccountsController < ApplicationController
  before_action :authenticate, only: %i[update]

  def update
    # current_user.update(user_params)
    current_user.assign_attributes(user_params)
    current_user.save_with_tags!(tag_names: tag_names)
    render json: current_user, serializer: UserSerializer
  end

  private
  
  def user_params
    params.require(:user).permit(:name, :introduction, :avatar, avatar: :data)
  end

  def tag_names
    params.dig(:user, :tag_names)
  end
end
