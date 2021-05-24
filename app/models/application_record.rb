class ApplicationRecord < ActiveRecord::Base
  include ActiveStorageSupport::SupportForBase64 # 追加:active-storage-base64 推奨設定
  self.abstract_class = true
end
