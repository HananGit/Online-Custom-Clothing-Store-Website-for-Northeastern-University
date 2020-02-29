(function () {
        angular
            .module("project")
            .controller("faqController", faqController);

        function faqController($scope) {
            $scope.shipping= [
                {
                    question: 'How soon can I get my order?',
                    answer: 'Standard production for shirts is within 1 week for non-peak periods. Our peak periords are during orientations. This may extend depending on the requirements you submit. We can expedite the production of your shirts for $5 per item. Expedite production takes 4 business days.'
                },
                {
                    question: 'How much is your shipping fee?',
                    answer: 'The shipping fee appears at the end section of the checkout process. The shipping depends on type of garment, weight, destination and method of shipment. We recommend DHL and UPS as the most cost-effective, fastest and reliable mode of shipping.'
                },
                {
                    question: 'Can I change my shipping address after submitting the order?',
                    answer:'Yes as long as the order has not yet been shipped. Please send an email to tailor@northeastern.com  You would need to receive confirmation from us that we have received your request for address change.'
                }
            ];

            $scope.billing= [
                {
                    question: 'How can I pay for my order?',
                    answer:'We accept Paypal and all major credit cards.'
                },
                {
                    question: 'Is my personal information secure? ',
                    answer:'Yes, all sensitive customer details are encrypted in our database.'
                },
                {
                    question: 'Can I use enter an international billing address for my credit card?',
                    answer:'Yes! our billing system accepts all international credit cards.'
                }
            ];

            $scope.measurements= [
                {
                    question: 'How do I get my exact measurements?',
                    answer:'You can take your exact measurements within 10 minutes. Please follow our guides strictly. Shirt method is the best way to get the perfect fitting shirt.'
                },
                {
                    question: 'How much allowances are added when measurements submitted are taken from actual body?',
                    answer:'When body measurements are submitted, our tailor adds allowances as room for movement. These allowances depend on the type of fit you have selected.'
                },
                {
                    question: 'Is there an extra fee for XXL custom size?',
                    answer:'Yes, there is 10% additional cost for XXL orders.'
                }
            ];

            $scope.fabrics= [
                {
                    question: 'What kind of fabric is used for the shirts?',
                    answer:'We believe in using the best always, so we use only 100% pure Cotton. Our price is unbeatable when compared to other vendors in the online market, who use the same kind of fabric. This is guaranteed!'
                },
                {
                    question: 'Do I have to worry about shrinkage?',
                    answer:'No. Majority of our fabrics are pre-shrunk, compliant with ITF standards that require cotton fabrics to shrink less than 2%. Any other residual shrinkage is considered in the shirt construction process. Some fabrics on our range eg linen and selected 100% cotton have shrinkage of 3-5%'
                },
                {
                    question: 'What is the difference between "Easy Care" and "Non-iron"?',
                    answer:'Easy Care fabrics require minimal ironing and have better drying and crease recovery properties, whilst Non-iron fabrics use Liquid Ammonia + moist cure finishing treatment. Non-iron fabrics are better and more resistant to wrinkles than the Easy Care fabrics.'
                }

            ];

            $scope.returns= [
                {
                    question: 'What is your Returns Policy?',
                    answer:'Our Fan Advocates are committed to your satisfaction and view each time you contact us as a chance to build a relationship. We are shoppers too and dedicated to delivering our customers the kind of shopping experience we would want to have. If your expectations are not exceeded, then feel free to return or exchange within one month of the delivery date .'
                },
                {
                    question: 'What are your alteration fees? ',
                    answer:'You can send your ordrt back to us if you need adjustments to be made. However, there will be %5 cost of the original price for any adjustment. '
                }
            ];

            function init() {
                console.log("In appointmentController")
            }

            init();
        }

    }
)();