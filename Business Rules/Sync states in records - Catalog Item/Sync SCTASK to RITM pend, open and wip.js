/*
Advanced: checked
When to run: after
Update: checked
Insert: checked
Table: sc_task
Filter Conditions: State | changes
*/


(function executeRule(current, previous /*null when async*/ ) {
    var gr = new GlideRecord('sc_task');
    gr.addQuery('request_item', current.parent);
    gr.query();
    var hasWIP = false;
    var isPending = false;
    var isOpen = true;
    var hasOpen = false;

    while (gr.next()) {
        var cTaskState = gr.getValue('state');
        var grReqItem = new GlideRecord('sc_req_item');

        if (grReqItem.get(gr.parent)) {

            if (cTaskState == '-5') {
                isPending = true;
                break;
            }

            if (cTaskState != 1 && isOpen) {
                isOpen = false;
            }

            if (cTaskState == '2') {
                hasWIP = true;
            }

            if (cTaskState == '1') {
                hasOpen = true;
            }

        }
    }

    if (isPending) {
        grReqItem.setValue('state', -5);
    } else {
        if(isOpen) {
            grReqItem.setValue('state', 1);
        } else {
            if(hasWIP || hasOpen) grReqItem.setValue('state', 2);   
        }
    }


    grReqItem.update();

})(current, previous);
