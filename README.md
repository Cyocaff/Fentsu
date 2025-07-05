# Fentsu
A small frontend framework to quickly make SPAs that uses jQuery, I made it to make my life easier on the frontend.

It is still in a very early stage, if you want to use this and have a good SEO I would recommend to use some pre-render tools.

Fentsu uses a small python server to just serve the static files and the base.html as a way to see quick results on development,
however I would recommend to use something like NGINX for serving the files in a production environment.
The python server checks wether an user is making a request from inside the page or is loading
the page, if the user is loading the page then the base.html template will be given, this
then uses the internal javascript code to do an ajax request to fill the page with the respective
javascript file.

Regarding the functions of the page, the backbone of everything is the loadPage function, which is the one that recieves
an url when an interaction is done, this then takes it to the router and from the router the code searches wether there is a
matching funcion with the url.

The router supports dynamic routes and http parameters.

When a function is loaded it will recieve the parameters from the router,
in a url with just one parameter it can be accessed with arg[0] if your function has
that name for parameters like this "function hello(arg)"

When you add http parameters these can be accesed in the number of parameters + 1, meaning
that if you have an url like /search/photos?q='landscapes' then arg is going to be [photos,'?q='landsapes']

Another function that is important to mention is the request function and send_send,
these are used for interacting with the API or backend that you are currently using, why two?
because request_send is used whenever the user wants to send files to the backend, the normal request
is for more light and simpler operations.

The authentication stuff is still very half-done and will be implemented later. 

The few pages that are in there are just to check if it works, I'll add more appropiate demo pages later.

