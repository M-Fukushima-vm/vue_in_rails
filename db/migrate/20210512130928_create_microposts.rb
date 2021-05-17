class CreateMicroposts < ActiveRecord::Migration[6.1]
  def change
    create_table :microposts do |t|
      t.text :content, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end

# foreign_key: true
#   1:多 の関係になる、多側に付ける(belongs to 側)
#     =>多側モデル作成時コマンド: $ rails g 多側のモデル名 1側のモデル名:references
#       (1側のモデル.rbファイルへの has_many 記載漏れに注意)
#         https://qiita.com/eitches/items/516ebd36bd3e8d633e41#%E3%81%A1%E3%81%AA%E3%81%BF%E3%81%AB%E8%BF%BD%E8%A8%98
#   これによって以下が可能。
#     ・多側に 1側のモデル名(小文字)_id のカラムが追加
#     ・includeメソッドが使用可能に
# 
#       includeメソッド
#         モデル操作で .all の発展系
#         =>関連モデルテーブルのレコード全て も含めて取ってくる
#           https://pikawaka.com/rails/includes