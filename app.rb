require 'sinatra/base'

class PageMagicApp < Sinatra::Base
  get '/' do
    erb :home
  end
end