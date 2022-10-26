class User < ApplicationRecord
    has_many :posts, dependent: :destroy
                        # class_name: "Post",
                        # foreign_key: "user_id",
                        # dependent: :destroy
    # Will return an array of follows for the given user instance
    has_many :received_follows, foreign_key: :followed_user_id, class_name: "Follow", dependent: :destroy
    # Will return an array of users who follow the user instance
    has_many :followers, through: :received_follows, source: :follower, dependent: :destroy
    # returns an array of follows a user gave to someone else
    has_many :given_follows, foreign_key: :follower_id, class_name: "Follow", dependent: :destroy
    # returns an array of other users who the user has followed
    has_many :followings, through: :given_follows, source: :followed_user, dependent: :destroy
    has_many :comments, through: :posts
    has_many :likes, through: :posts, dependent: :destroy
    has_secure_password

    # after_initialize do |user|
    #     user.posts = [] if user.posts == nil
    # end

    def following_posts_list
        list_count = []
        self.followings.each { 
            |x| x.posts.each {
                |post| list_count << post
            }
        }
        list_count
    end

end
