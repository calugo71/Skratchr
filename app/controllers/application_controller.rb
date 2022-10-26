class ApplicationController < ActionController::API

    def secret
    'word'
    end

    def encode(user_id)
    payload = {
        user_id: user_id
    }
    JWT.encode payload, secret, 'HS256'
    end

    def decode(token)
    JWT.decode(token, secret)[0]['user_id']
    end
    
end
