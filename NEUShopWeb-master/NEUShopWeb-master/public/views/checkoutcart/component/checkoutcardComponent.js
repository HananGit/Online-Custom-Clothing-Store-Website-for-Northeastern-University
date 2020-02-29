(function () {
        function checkoutcartcardConroller(toaster) {
            var ctrl = this;

            ctrl.deletefromcart = function() {
                ctrl.deletefromCart({product: ctrl.data});
            };

            ctrl.onqtychange = function(){
                if(ctrl.data.qty==0 || ctrl.data.qty<0)
                {
                    toaster.pop('info', "Information", "Item Automatically Removed");
                    ctrl.deletefromCart({product: ctrl.data});
                }
                else {
                    ctrl.onqtyChange({product: ctrl.data});
                }
            }
        }

        angular
            .module("project")
            .component("checkoutcartCard", checkoutcartCard());

        function checkoutcartCard() {

            return{
                templateUrl: "views/checkoutcart/templates/checkoutcartCard.html",
                bindings: { data: '=', deletefromCart: '&', onqtyChange:'&' },
                controller: checkoutcartcardConroller,
            };

        }

    }
)();