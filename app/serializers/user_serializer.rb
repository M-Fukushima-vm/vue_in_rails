class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :introduction, :avatar_url

  def avatar_url
    if object.avatar.attached? # 添付されてる時
      # avatar のリンクを作成して返す
      Rails.application.routes.url_helpers.rails_blob_path(object.avatar, only_path: true)
    else
      'https://placehold.jp/300x300.png'
    end
  end
  has_many :tags
end
