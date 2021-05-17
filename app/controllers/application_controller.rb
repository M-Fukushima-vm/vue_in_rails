class ApplicationController < ActionController::Base
  # Tokenが一致しなかった場合にsessionを空にする(CSRF対策設定)
  protect_from_forgery with: :null_session

  # 独自例外の定義にStandardErrorを継承(https://blog.toshimaru.net/ruby-standard-error/)
  class AuthenticationError < StandardError; end

  # rescue_from: 例外処理の設定
    # railsのレコードがなかった時の例外エラー(ActiveRecord::RecordNotFound)が起きたら
    # privateメソッドの render_404 を返す
  rescue_from ActiveRecord::RecordNotFound, with: :render_404

  # rescue_from: 例外処理の設定
    # railsのバリデーションエラー(ActiveRecord::RecordInvalid)が起きたら
    # privateメソッドの render_422 を返す
  rescue_from ActiveRecord::RecordInvalid, with: :render_422

  # rescue_from: 例外処理の設定(独自)
    # AuthenticationError(独自)が起きたら
    # privateメソッドの not_authenticated を返す
  rescue_from AuthenticationError, with: :not_authenticated


# ここからアクション
  # ...現在ログイン中のユーザーか判定して @current_user にキャッシュ
  def current_user
    # @current_user か
    # nil の時には、作成するJwt::UserAuthenticatorの call メソッド結果を返す
      # (=>app/services/jwt/user_authenticator.rb)
    # リクエストヘッダーの情報を引数にして呼ぶ(呼ぶ call メソッド内で使う為)
    # https://qiita.com/aiandrox/items/f4215471f40325d69523
    @current_user ||= Jwt::UserAuthenticator.call(request.headers)
    # debugger
  end

  # ...現在ログイン中のuserでなければ
  # (current_userメソッドで@current_userが取れなければ)
  # エラーを発生させる
  def authenticate
    # debugger
    # raise 〜 ...〜エラーを発生させる
    # AuthenticationErrorを発生させて、
    # rescue_from:に設定した privateメソッド を実行する
    raise AuthenticationError unless current_user
  end

# ここからprivateメソッド
  private

  def render_404(exception)
    # not_foundステータスとエラーメッセージをjson形式で返す
    render json: { error: { messages: exception.message } }, status: :not_found
  end

  def render_422(exception)
    # unprocessable_entityステータスとエラーメッセージをjson形式で返す
      # railsの処理できない実体(unprocessable_entity 422)ステータス
      # https://railsguides.jp/layouts_and_rendering.html#status%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3
    render json: { error: { messages: exception.record.errors.full_messages } },
    status: :unprocessable_entity
  end

  # ログインしていないと判断される時
  def not_authenticated
    # unauthorizedステータスとエラーメッセージをjson形式で返す
    render json: { error: { messages: ['ログインしてください'] } }, status: :unauthorized
  end
end
