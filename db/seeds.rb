# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
puts "💣 Destroying previous seeds..."
p '5'
User.destroy_all
p '4'
Post.destroy_all
p '3'
Comment.destroy_all
p '2'
Like.destroy_all
p '1'

p "🌱 Seeding Users"
carlos = User.create!(username: "carlos", password: "123")
p "🌲 Seeding Done!"