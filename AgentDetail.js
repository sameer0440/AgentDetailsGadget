// author Sameer Kumar <sameyada@cisco.com >
var finesse = finesse || {};
finesse.gadget = finesse.gadget || {};
finesse.container = finesse.container || {};
clientLogs = finesse.cslogger.ClientLogger || {}; // for logging

finesse.modules = finesse.modules || {};
finesse.modules.AgentDetail = (function($) {


        var user,


            renderLoad = function() {
                agentdetail = user.getFullName() + ' (' + user.getExtension() + ')'
                clientLogs.log("about to show agent name");
                $("#agentdetail").text(agentdetail);

            },


            handleUserLoad = function(userevent) {
                renderLoad();
                console.log(user);
            };

        handleUserChange = function(userevent) {};

        return {


            init: function() {
                var cfg = finesse.gadget.Config;
                clientLogs = finesse.cslogger.ClientLogger;
                finesse.clientservices.ClientServices.init(cfg, false);

                clientLogs.init(gadgets.Hub, "AgentDetail");

                user = new finesse.restservices.User({
                    id: cfg.id,
                    onLoad: handleUserLoad,
                    onChange: handleUserChange
                });

                states = finesse.restservices.User.States;
                containerServices = finesse.containerservices.ContainerServices.init();

                containerServices.addHandler(finesse.containerservices.ContainerServices.Topics.ACTIVE_TAB, function() {
                    clientLogs.log("Gadget is now visible");
                    gadgets.window.adjustHeight();
                });
                containerServices.makeActiveTabReq();
            }
        };
    }

    (jQuery));
