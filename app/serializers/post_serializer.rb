class PostSerializer < ActiveModel::Serializer
  attributes :id, :image, :title, :likes, :user, :comments
end
