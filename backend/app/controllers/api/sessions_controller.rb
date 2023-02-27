class Api::SessionsController < ApplicationController
  def show
    if current_user
      render json: current_user
    else
      render json: { message: 'No current user' }, status: :unauthorized
    end
  end

  def create
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user
      login!(@user)
      render json: @user
    else
      render json: { message: 'Invalid credentials' }, status: :unauthorized
    end
  end

  def destroy
    logout!
    render json: { message: 'Logged out' }
  end
end
