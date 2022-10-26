class FollowsController < ApplicationController

    #POST add followings
    def add_follow
        token = request.headers['token']
        user_id = decode(token)
        user = User.find_by!(id: user_id)
        target = User.find_by!(username: params[:username])
        relationship = Follow.create!(follower: user, followed_user: target)
        render json: relationship, serializer: RelationshipSerializer
    end



end
