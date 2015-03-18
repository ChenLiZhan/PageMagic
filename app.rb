require 'sinatra/base'
require 'digest/sha1'

class PageMagicApp < Sinatra::Base
  configure :production, :development do
    enable :logging
  end

  get '/' do
    File.open('public/draft/temp.txt', 'r') do |file|
      @content = file.read
    end
    logger.info @content
    erb :home
  end

  post '/api/v1/save' do
    content = request.body.read

    File.open('public/draft/temp.txt', 'w') do |file|
      file.puts content
    end
  end

  post '/api/v1/compare' do
    File.open('public/draft/temp.txt', 'r') do |file|
      origin_content = Digest::SHA1.hexdigest file.read
      current_content = Digest::SHA1.hexdigest request.body.read
      if origin_content === current_content
        return 'not change'
      else
        return 'change'
      end
    end
  end
end