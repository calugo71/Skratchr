class PostsController < ApplicationController

  # GET /posts or /posts.json
  def index
    @posts = Post.all
    render json: @posts
  end

    # GET /post/1
    def show
      post = Post.find_by!(id: params[:id])
      render json: post
    end
  

  # POST /posts or /posts.json
  def create_post
    token = request.headers['token']
    user_id = decode(token)
    user = User.find(user_id)
    post = Post.create!(image:params[:image],title:params[:title],user_id: user.id)
    render json: post
  end

  def user_posts
    token = request.headers['token']
    user_id = decode(token)
    user = User.find(user_id)
    post = Post.where(user_id: user)
    render json: post
  end

  private
    # # Use callbacks to share common setup or constraints between actions.
    # def set_post
    #   @post = Post.find(params[:id])
    # end

    # # Only allow a list of trusted parameters through.
    # def post_params
    #   params.permit(:image,:title,:comment:,:likes,:user)
    # end
end
