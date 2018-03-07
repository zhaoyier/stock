/**
 * Created by zhaojianwei on 2018/1/2.
 */

mygrid = {};

mygrid.timeFormat = function(t){
    //return timeFormat(t);
};

mygrid.datepicker = {
    format: "yyyy-mm-dd 00:00:00",
    weekStart: 1,
    language: "zh-CN"
};

mygrid.scripts = [null,"js/jquery.jqGrid.src.js","js/grid.locale-cn.js", null];

mygrid.create = function(id,pager,option) {
    var grid_selector = id || "#grid-table";
    var pager_selector = pager ||"#grid-pager";

    //resize to fit page size
    $(window).on('resize.jqGrid', function () {
        $(grid_selector).jqGrid( 'setGridWidth', $(".page-content").width() );
    });

    //resize on sidebar collapse/expand
    var parent_column = $(grid_selector).closest('[class*="col-"]');
    $(document).on('settings.ace.jqGrid' , function(ev, event_name, collapsed) {
        if( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed' ) {
            //setTimeout is for webkit only to give time for DOM changes and then redraw!!!
            setTimeout(function() {
                $(grid_selector).jqGrid( 'setGridWidth', parent_column.width() );
            }, 0);
        }
    });

    var errorTextFormat = function(xhr,status,error){
        if( xhr['responseJSON'] ){
            var msg1 = xhr['responseJSON']['err'];
            if(xhr['responseJSON']['ret']) msg1 += '<br/>'+ xhr['responseJSON']['ret'];
            return msg1
        }
        else{
            var msg2 = xhr.responseText||'未知错误';
            return msg2
        }
    };

    var options = $.extend({
        url: '',
        datatype: "json",
        mtype: "POST",
        height: "auto",
        autowidth:false,
        colModel: [
            { label: 'OrderID', name: 'OrderID', key: true, width: 50,editable:true },
            { label: 'Customer ID', name: 'CustomerID', width: 150,editable:true },
            { label: 'Order Date', name: 'OrderDate', width: 150,editable:true },
            { label: 'Freight', name: 'Freight', width: 150,editable:true },
            { label:'Ship Name', name: 'ShipName', width: 150,editable:true }
        ],
        jsonReader:{
            root: "ret.rows",
            page: "ret.page",
            total: "ret.total",
            records: "ret.records",
            repeatitems: true,
        },
        prmNames : {
            page:"page",        // 表示请求页码的参数名称
            rows:"size",        // 表示请求行数的参数名称
            sort: "sort",       // 表示用于排序的列名的参数名称
            order: "order",     // 表示采用的排序方式的参数名称
            id:"id",             // 表示当在编辑数据模块中发送数据时，使用的id的名称
            oper:"act",         // operation参数名称
            editoper:"edit",         // 当在edit模式中提交数据时，操作的名称
            addoper:"add",            // 当在add模式中提交数据时，操作的名称
            deloper:"del",            // 当在delete模式中提交数据时，操作的名称
            totalrows:"totalrows"    // 表示需从Server得到总共多少行数据的参数名称，参见jqGrid选项中的rowTotal
        },
        loadError:function(xhr,status,error){
            if( xhr['responseJSON'] ){
                var msg = xhr['responseJSON']['err'];
                if(xhr['responseJSON']['ret']) msg += '<br/>'+ xhr['responseJSON']['ret'];
            }
            else{
                var msg = xhr.responseText||'未知错误';
            }
            $.gritter.add({ title: error, text: msg, class_name: 'gritter-error' });
        },
        loadComplete : function() {
            var table = this;
            setTimeout(function(){
                updatePagerIcons(table);
                enableTooltips(table);
            }, 0);
        },
        viewrecords : true,
        rowNum:20,
        rowList:[20,50,100],
        pager : pager_selector,
        altRows: true,
        multiselect: true,
        multiboxonly: true,
        editurl: "",//nothing is saved
        caption: false //"jqGrid with inline editing"
    },option||{});



    jQuery(grid_selector).jqGrid(options);

    $(window).triggerHandler('resize.jqGrid');//trigger window resize to make the grid get the correct size
    $(grid_selector).closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
    $(grid_selector).closest(".ui-jqgrid-bdiv").css({ "overflow-y" : "hidden" });

    //navButtons
    jQuery(grid_selector).jqGrid('navGrid',pager_selector,
        $.extend({},{ 	//navbar options
            edit: true,
            editicon : 'ace-icon fa fa-pencil blue',
            add: true,
            addicon : 'ace-icon fa fa-plus-circle purple',
            del: true,
            delicon : 'ace-icon fa fa-trash-o red',
            search: true,
            searchicon : 'ace-icon fa fa-search orange',
            refresh: true,
            refreshicon : 'ace-icon fa fa-refresh green',
            view: true,
            viewicon : 'ace-icon fa fa-search-plus grey'
        },option['navbar']||{}),

        $.extend({},{
            //edit record form
            //closeAfterEdit: true,
            width: 700,
            closeAfterEdit:true,
            viewPagerButtons:false,
            recreateForm: true,
            errorTextFormat : errorTextFormat,
            beforeShowForm : function(e) {
                var form = $(e[0]);
                form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
                style_edit_form(form);
            }
        },option['edit']||{}),
        $.extend({},{
            //new record form
            width: 700,
            closeAfterAdd: true,
            recreateForm: true,
            viewPagerButtons: false,
            errorTextFormat : errorTextFormat,
            beforeShowForm : function(e) {
                var form = $(e[0]);
                form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar')
                    .wrapInner('<div class="widget-header" />');
                style_edit_form(form);
            },
            afterSubmit: function (response,postdata) {
                if (response.responseJSON.code !== 200) {
                    alert(response.responseJSON.message)
                } else {
                    return [true, '']
                }
            }
        },option['add']||{}),
        {
            //delete record form
            recreateForm: true,
            beforeShowForm : function(e) {
                var form = $(e[0]);
                if(form.data('styled')) return false;

                form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
                style_delete_form(form);

                form.data('styled', true);
            },
            onClick : function(e) {
                //alert(1);
            }
        },
        {
            //search form
            recreateForm: true,
            afterShowSearch: function(e){
                var form = $(e[0]);
                form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
                style_search_form(form);
            },
            afterRedraw: function(){
                style_search_filters($(this));
            }
            ,
            multipleSearch: false,
            /**
             multipleGroup:true,
             showQuery: true
             */
        },
        $.extend({},{
            //view record form
            width: 700,
            recreateForm: true,
            beforeShowForm: function(e){
                var form = $(e[0]);
                form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
            }
        },option['view']||{})
    )



    function style_edit_form(form) {
        //enable datepicker on "sdate" field and switches for "stock" field
        form.find('input[name=sdate]').datepicker({format:'yyyy-mm-dd' , autoclose:true})

        form.find('input[name=stock]').addClass('ace ace-switch ace-switch-5').after('<span class="lbl"></span>');
        //don't wrap inside a label element, the checkbox value won't be submitted (POST'ed)
        //.addClass('ace ace-switch ace-switch-5').wrap('<label class="inline" />').after('<span class="lbl"></span>');


        //update buttons classes
        var buttons = form.next().find('.EditButton .fm-button');
        buttons.addClass('btn btn-sm').find('[class*="-icon"]').hide();//ui-icon, s-icon
        buttons.eq(0).addClass('btn-primary').prepend('<i class="ace-icon fa fa-check"></i>');
        buttons.eq(1).prepend('<i class="ace-icon fa fa-times"></i>')

        buttons = form.next().find('.navButton a');
        buttons.find('.ui-icon').hide();
        buttons.eq(0).append('<i class="ace-icon fa fa-chevron-left"></i>');
        buttons.eq(1).append('<i class="ace-icon fa fa-chevron-right"></i>');
    }

    function style_delete_form(form) {
        var buttons = form.next().find('.EditButton .fm-button');
        buttons.addClass('btn btn-sm btn-white btn-round').find('[class*="-icon"]').hide();//ui-icon, s-icon
        buttons.eq(0).addClass('btn-danger').prepend('<i class="ace-icon fa fa-trash-o"></i>');
        buttons.eq(1).addClass('btn-default').prepend('<i class="ace-icon fa fa-times"></i>')
    }

    function style_search_filters(form) {
        form.find('.delete-rule').val('X');
        form.find('.add-rule').addClass('btn btn-xs btn-primary');
        form.find('.add-group').addClass('btn btn-xs btn-success');
        form.find('.delete-group').addClass('btn btn-xs btn-danger');
    }
    function style_search_form(form) {
        var dialog = form.closest('.ui-jqdialog');
        var buttons = dialog.find('.EditTable')
        buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'ace-icon fa fa-retweet');
        buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'ace-icon fa fa-comment-o');
        buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-purple').find('.ui-icon').attr('class', 'ace-icon fa fa-search');
    }
    //replace icons with FontAwesome icons like above
    function updatePagerIcons(table) {
        var replacement =
            {
                'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
                'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
                'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
                'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
            };
        $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
            var icon = $(this);
            var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

            if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
        })
    }

    function enableTooltips(table) {
        $('.navtable .ui-pg-button').tooltip({container:'body'});
        $(table).find('.ui-pg-div').tooltip({container:'body'});
    }
    //var selr = jQuery(grid_selector).jqGrid('getGridParam','selrow');

    $(document).one('ajaxloadstart.page', function(e) {
        $(grid_selector).jqGrid('GridUnload');
        $('.ui-jqdialog').remove();
    });
};

