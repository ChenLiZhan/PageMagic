require 'sinatra/base'

class PageMagicApp < Sinatra::Base
  configure :production, :development do
    enable :logging
  end
  get '/' do
    @content
    File.open('public/draft/temp.txt', 'r') do |file|
      @content = file.read
    end
    erb :home
  end

  post '/api/v1/save' do
    content = request.body.read
    logger.info content
    
    File.open('public/draft/temp.txt', 'w') do |file|
      file.puts content
    end
  end
end