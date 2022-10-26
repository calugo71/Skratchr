class CommentSerializer < ActiveModel::Serializer
  attributes :id, :text, :post, :user

  #, :text, :post, :user
end
