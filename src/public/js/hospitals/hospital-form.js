$(function () {
    const provinceSelect = $('#hospital-province');
    const districtSelect = $('#hospital-district');
    const wardSelect = $('#hospital-ward');
    updateDistrictSelect(hospital.province_id);
    updateWardSelect(hospital.district_id);

    provinceSelect.change(function () {
        updateDistrictSelect($(this).val());
    });
    districtSelect.change(function () {
        updateWardSelect($(this).val());
    });

    function updateDistrictSelect(provinceId) {
        if (provinceId) {
            $.get(
                '/api/provinces/' + provinceId + '/districts',
                function (districts) {
                    districtSelect.empty();
                    districtSelect.append(
                        '<option value="">Chọn Quận/Huyện</option>',
                    );
                    $.each(districts, function (index, district) {
                        districtSelect.append(
                            `<option value="${district.id}" ${
                                district.id === hospital.district_id &&
                                'selected'
                            } >${district.name}</option>`,
                        );
                    });
                    districtSelect.trigger('chosen:updated');
                },
            );
        } else {
            districtSelect.empty();
            districtSelect.append('<option value="">Chọn Quận/Huyện</option>');
            districtSelect.trigger('chosen:updated');
        }
        wardSelect.empty();
        wardSelect.append('<option value="">Chọn Phường/Xã</option>');
        wardSelect.trigger('chosen:updated');
    }
    function updateWardSelect(districtId) {
        if (districtId) {
            $.get('/api/districts/' + districtId + '/wards', function (wards) {
                wardSelect.empty();
                wardSelect.append('<option value="">Chọn Phường/Xã</option>');
                $.each(wards, function (index, ward) {
                    wardSelect.append(
                        `<option value="${ward.id}" ${
                            ward.id === hospital.ward_id && 'selected'
                        } >${ward.name}</option>`,
                    );
                });
                wardSelect.trigger('chosen:updated');
            });
        } else {
            wardSelect.empty();
            wardSelect.append('<option value="">Chọn Phường/Xã</option>');
            wardSelect.trigger('chosen:updated');
        }
    }

    $('form').on('submit', function (e) {
        // Reset
        provinceSelect.parents('.form-group').removeClass('has-error');
        districtSelect.parents('.form-group').removeClass('has-error');
        wardSelect.parents('.form-group').removeClass('has-error');

        if (provinceSelect.val() === '') {
            // Add has-error class when provinceSelect element is required
            provinceSelect.parents('.form-group').addClass('has-error');

            // Stop submiting
            return false;
        }
        if (districtSelect.val() === '') {
            // Add has-error class when districtSelect element is required
            districtSelect.parents('.form-group').addClass('has-error');

            // Stop submiting
            return false;
        }
        if (wardSelect.val() === '') {
            // Add has-error class when wardSelect element is required
            wardSelect.parents('.form-group').addClass('has-error');

            // Stop submiting
            return false;
        }
    });

    function checkForm(select) {
        // Reset
        select.parents('.form-group').removeClass('is-invalid');

        if (select.val() === '') {
            // Add is-invalid class when select2 element is required
            select.parents('.form-group').addClass('is-invalid');

            // Stop submiting
            return false;
        }
    }
});
