class ProfileSerializer < ActiveModel::Serializer
    attributes :id, :username, :followers, :followings, :likes, :posts
end
