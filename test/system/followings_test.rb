require "application_system_test_case"

class FollowingsTest < ApplicationSystemTestCase
  setup do
    @following = followings(:one)
  end

  test "visiting the index" do
    visit followings_url
    assert_selector "h1", text: "Followings"
  end

  test "should create following" do
    visit followings_url
    click_on "New following"

    click_on "Create Following"

    assert_text "Following was successfully created"
    click_on "Back"
  end

  test "should update Following" do
    visit following_url(@following)
    click_on "Edit this following", match: :first

    click_on "Update Following"

    assert_text "Following was successfully updated"
    click_on "Back"
  end

  test "should destroy Following" do
    visit following_url(@following)
    click_on "Destroy this following", match: :first

    assert_text "Following was successfully destroyed"
  end
end
