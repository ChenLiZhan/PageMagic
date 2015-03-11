require 'sinatra/base'

class PageMagicApp < Sinatra::Base
  configure :production, :development do
    enable :logging
  end
  get '/' do
    erb :home
  end

  post '/api/v1/save' do
    content = request.body.read
    logger.info content
    
    File.open('draft/temp.txt', 'w') do |file|
      file.puts content
    end
  end
end