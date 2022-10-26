class RelationshipSerializer < ActiveModel::Serializer
    attributes :follower_id, :followed_user_id
  end
  