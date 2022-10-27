class CommentsController < ApplicationController

  # GET /comments or /comments.json
  def index
    comments = Comment.all
    render json: comments
  end

  def add_comment
    token = request.headers['token']
    user_id = decode(token)
    user = User.find_by!(id: user_id)
    target = Post.find_by!(id: params[:post_id])
    comment = Comment.create!(text: params[:text], user_id: user.id, post_id: target.id)
    render json: comment
end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def comment_params
      params.fetch(:comment, {})
    end
end
