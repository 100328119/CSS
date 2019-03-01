import React, {Component} from 'react';
import {withStyles, Button, Tab, Tabs, TextField, InputAdornment, Icon, Typography} from '@material-ui/core';
import {FuseAnimate, FusePageCarded, FuseChipSelect} from '@fuse';
import {orange} from '@material-ui/core/colors';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import classNames from 'classnames';
import _ from '@lodash';
import withReducer from 'app/store/withReducer';
import * as Actions from './store/actions';
import reducer from './store/reducers';

const styles = theme => ({
    productImageFeaturedStar: {
        position: 'absolute',
        top     : 0,
        right   : 0,
        color   : orange[400],
        opacity : 0
    },
    productImageItem        : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover'               : {
            boxShadow                    : theme.shadows[5],
            '& $productImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured'            : {
            pointerEvents                      : 'none',
            boxShadow                          : theme.shadows[3],
            '& $productImageFeaturedStar'      : {
                opacity: 1
            },
            '&:hover $productImageFeaturedStar': {
                opacity: 1
            }
        }
    }
});

class NewCalendar extends Component {

    state = {
        tabValue: 0,
        form    : null,
        start : new Date(),
        end : new Date()
    };

    componentDidMount()
    {
        // this.updateProductState();
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        // if ( !_.isEqual(this.props.location, prevProps.location) )
        // {
        //     this.updateProductState();
        // }
        //
        // if (
        //     (this.props.product.data && !this.state.form) ||
        //     (this.props.product.data && this.state.form && this.props.product.data.id !== this.state.form.id)
        // )
        // {
        //     this.updateFormState();
        // }
    }

    updateFormState = () => {
        // this.setState({form: this.props.product.data})
    };

    updateProductState = () => {
        // const params = this.props.match.params;
        // const {productId} = params;
        //
        // if ( productId === 'new' )
        // {
        //     this.props.newProduct();
        // }
        // else
        // {
        //     this.props.getProduct(this.props.match.params);
        // }
    };

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

    handleChange = (event) => {
        // this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };

    handleChipChange = (value, name) => {
        // this.setState({form: _.set({...this.state.form}, name, value.map(item => item.value))});
    };

    setFeaturedImage = (id) => {
        // this.setState({form: _.set({...this.state.form}, 'featuredImageId', id)});
    };

    canBeSubmitted()
    {
        // const {name} = this.state.form;
        // return (
        //     name.length > 0 &&
        //     !_.isEqual(this.props.product.data, this.state.form)
        // );
    }

    render()
    {
        const {classes, saveProduct} = this.props;
        const {tabValue, form, start, end} = this.state;

        return (
            <FusePageCarded
                classes={{
                    toolbar: "p-0",
                    header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header = {
                  <div className="flex flex-1 w-full items-center justify-between">

                      <div className="flex flex-col items-start max-w-full">
                        <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/example">
                                <Icon className="mr-4 text-20">arrow_back</Icon>
                                Calendars
                            </Typography>
                        </FuseAnimate>
                        <div className="flex items-center max-w-full">
                          <FuseAnimate animation="transition.expandIn" delay={300}>
                              {form ? (
                                  <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src={_.find(form.images, {id: form.featuredImageId}).url} alt={form.name}/>
                              ) : (
                                  <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/ecommerce/product-image-placeholder.png" alt={form}/>
                              )}
                          </FuseAnimate>
                          <div className="flex flex-col min-w-0">
                              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                  <Typography className="text-16 sm:text-20 truncate">
                                      {form ? form: 'New Calendar'}
                                  </Typography>
                              </FuseAnimate>
                              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                  <Typography variant="caption">Calendar Detail</Typography>
                              </FuseAnimate>
                          </div>
                        </div>
                      </div>
                      <FuseAnimate animation="transition.slideRightIn" delay={300}>
                          <Button
                              className="whitespace-no-wrap"
                              variant="contained"
                              disabled={true}
                              onClick=""
                          >
                              Create
                          </Button>
                      </FuseAnimate>
                  </div>
                }
                contentToolbar={
                    <Tabs
                        value={tabValue}
                        onChange={this.handleChangeTab}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="auto"
                        classes={{root: "w-full h-64"}}
                    >
                        <Tab className="h-64 normal-case" label="Basic Info"/>
                        <Tab className="h-64 normal-case" label="Basic Info Form 2"/>
                    </Tabs>
                }
                content={
                        <div className="p-16 sm:p-24 max-w-2xl">
                            {tabValue === 0 &&
                            (
                                <div>

                                    <TextField
                                        className="mt-8 mb-16"
                                        error="{form.name === ''}"
                                        required
                                        label="Calendar Name"
                                        autoFocus
                                        id="name"
                                        name="name"
                                        value="{form.name}"
                                        onChange="{this.handleChange}"
                                        variant="outlined"
                                        fullWidth
                                    />
                                    <TextField
                                        id="start"
                                        name="start"
                                        label="Start"
                                        type="datetime-local"
                                        className="mt-8 mb-16"
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        inputProps={{
                                            max: end
                                        }}
                                        value={start}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />

                                    <TextField
                                        id="end"
                                        name="end"
                                        label="End"
                                        type="datetime-local"
                                        className="mt-8 mb-16"
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        inputProps={{
                                            min: start
                                        }}
                                        value={end}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />

                                    <TextField
                                        className="mt-8 mb-16"
                                        id="description"
                                        name="description"
                                        onChange="{this.handleChange}"
                                        label="Description"
                                        type="text"
                                        value="{form.description}"
                                        multiline
                                        rows={5}
                                        variant="outlined"
                                        fullWidth
                                    />

                                    <FuseChipSelect
                                        className="mt-8 mb-24"
                                        value="{}"
                                        onChange={(value) => this.handleChipChange(value, 'categories')}
                                        placeholder="Select multiple categories"
                                        textFieldProps={{
                                            label          : 'Categories',
                                            InputLabelProps: {
                                                shrink: true
                                            },
                                            variant        : 'outlined'
                                        }}
                                        isMulti
                                    />

                                    <FuseChipSelect
                                        className="mt-8 mb-16"
                                        value=""
                                        onChange={(value) => this.handleChipChange(value, 'tags')}
                                        placeholder="Select multiple tags"
                                        textFieldProps={{
                                            label          : 'Tags',
                                            InputLabelProps: {
                                                shrink: true
                                            },
                                            variant        : 'outlined'
                                        }}
                                        isMulti
                                    />
                                </div>
                            )}
                            {tabValue === 1 &&
                            (
                                <div>

                                    <TextField
                                        className="mt-8 mb-16"
                                        error="{form.name === ''}"
                                        required
                                        label="Name"
                                        autoFocus
                                        id="name"
                                        name="name"
                                        value="{form.name}"
                                        onChange="{this.handleChange}"
                                        variant="outlined"
                                        fullWidth
                                    />

                                    <TextField
                                        className="mt-8 mb-16"
                                        id="description"
                                        name="description"
                                        onChange="{this.handleChange}"
                                        label="Description"
                                        type="text"
                                        value="{form.description}"
                                        multiline
                                        rows={5}
                                        variant="outlined"
                                        fullWidth
                                    />

                                    <FuseChipSelect
                                        className="mt-8 mb-24"
                                        value="{}"
                                        onChange={(value) => this.handleChipChange(value, 'categories')}
                                        placeholder="Select multiple categories"
                                        textFieldProps={{
                                            label          : 'Categories',
                                            InputLabelProps: {
                                                shrink: true
                                            },
                                            variant        : 'outlined'
                                        }}
                                        isMulti
                                    />

                                    <FuseChipSelect
                                        className="mt-8 mb-16"
                                        value=""
                                        onChange={(value) => this.handleChipChange(value, 'tags')}
                                        placeholder="Select multiple tags"
                                        textFieldProps={{
                                            label          : 'Tags',
                                            InputLabelProps: {
                                                shrink: true
                                            },
                                            variant        : 'outlined'
                                        }}
                                        isMulti
                                    />
                                </div>
                            )}
                        </div>

                }
                innerScroll
            />
        )
    };
}

// function mapDispatchToProps(dispatch)
// {
//     return bindActionCreators({
//         getProduct : Actions.getProduct,
//         newProduct : Actions.newProduct,
//         saveProduct: Actions.saveProduct
//     }, dispatch);
// }

// function mapStateToProps({CalendarsApp})
// {
//     return {
//         product: CalendarsApp.data
//     }
// }

export default withStyles(styles, {withTheme: true})(NewCalendar);
