class Api::UsersController < ApplicationController
  PAGINATES_PAR = 12

  def index
    users = User.order(created_at: :desc).page(params[:page]).per(PAGINATES_PAR)
    render json: users, each_serializer: UserSerializer,
                        meta: {
                          total_pages: users.total_pages,
                          total_count: users.total_count,
                          current_page: users.current_page
                        }
  end

  def create
    user = User.new(user_params)
    user.save!
    # https://railsguides.jp/layouts_and_rendering.html#status%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3
    render json: user, serializer: UserSerializer
  end

  def show
    user = User.find(params[:id])
    render json: user, serializer: UserSerializer
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
