class LikesController < ApplicationController

    # GET /posts or /posts.json
    def index
        likes = Like.all
        render json: likes
    end

    # POST likes
    def like_picture
        token = request.headers['token']
        user_id = decode(token)
        user = User.find_by!(id: user_id)
        target = Post.find_by!(id: params[:post_id])
        like = Like.create!(user_id: user.id, post_id: target.id)
        render json: like
    end

        # DELETE likes
        def unlike_picture
            token = request.headers['token']
            user_id = decode(token)
            user = User.find_by!(id: user_id)
            target = Post.find_by!(id: params[:post_id])
            like = Like.find_by!(user_id: user.id, post_id: target.id)
            like.destroy
        end

end
