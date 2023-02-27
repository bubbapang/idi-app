class User < ApplicationRecord
  has_secure_password
  before_validation :ensure_session_token

  validates :username, 
    uniqueness: true, 
    length: { in: 3..30 }, 
    format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
  validates :email, 
    uniqueness: true, 
    length: { in: 3..255 }, 
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true

  # ASPIRE

  def self.find_by_credentials(credential, password)
    # determine the field you need to query: 
    #   * `email` if `credential` matches `URI::MailTo::EMAIL_REGEXP`
    #   * `username` if not
    # find the user whose email/username is equal to `credential`
  
    # if no such user exists, return a falsey value
  
    # if a matching user exists, use `authenticate` to check the provided password
    # return the user if the password is correct, otherwise return a falsey value

    # code
    if credential.match?(URI::MailTo::EMAIL_REGEXP)
      user = User.find_by(email: credential)
    else
      user = User.find_by(username: credential)
    end

    return nil unless user
  end

  def password=(password)
    # set the `password_digest` attribute to the result of calling `BCrypt::Password.create` on `password`
    # set the `password` attribute to `password`
    # use `BCrypt::Password.create` to create a new password digest
    # set the `password_digest` attribute to the new password digest
    # set the `password` attribute to `password`
    # return the `password` attribute
    self.password_digest = BCrypt::Password.create(password)
    @password = password
    self.password_digest
  end

  def is_password?(password)
    # use `BCrypt::Password.new` to create a new password digest object
    # use `BCrypt::Password#is_password?` to check if the provided password is correct
    # return true/false
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    # `update!` the user's session token to a new, random token
    # return the new session token, for convenience
    self.session_token = generate_unique_session_token
    self.save!
    self.session_token
  end

  private

  def generate_unique_session_token
    # in a loop:
      # use SecureRandom.base64 to generate a random token
      # use `User.exists?` to check if this `session_token` is already in use
      # if already in use, continue the loop, generating a new token
      # if not in use, return the token

    loop do
      token = SecureRandom.base64
      return token unless User.exists?(session_token: token)
    end

  end

  def ensure_session_token
    # if `self.session_token` is already present, leave it be
    # if `self.session_token` is nil, set it to `generate_unique_session_token`
    self.session_token ||= generate_unique_session_token
  end
end
