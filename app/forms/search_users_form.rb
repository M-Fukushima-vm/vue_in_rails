class SearchUsersForm
  include ActiveModel::Model # 自作クラスをmodelの様に扱うために include
  include ActiveModel::Attributes # 属性定義のために include

  attribute :name, :string # キー名 型
  attribute :tag_ids, array: :integer # キー名 型 要素の型

  def search
    # relation = User.all
    relation = User.distinct
    # debugger
    relation = relation.by_name(name) if name.present?
    relation = relation.by_tag(tag_ids) if tag_ids.present?
    relation
  end
end